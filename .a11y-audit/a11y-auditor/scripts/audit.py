#!/usr/bin/env python3
"""
WCAG 2.0 AA Accessibility Auditor
Performs static analysis of TSX/React code for accessibility issues
"""

import os
import re
import sys
import json
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass
from enum import Enum

class Severity(Enum):
    CRITICAL = "critical"  # Blocks access
    MAJOR = "major"        # Significant barrier  
    MINOR = "minor"        # Usability issue

@dataclass
class Issue:
    file_path: str
    line_number: int
    severity: Severity
    wcag_criterion: str
    issue_type: str
    description: str
    code_snippet: str
    recommendation: str

class A11yAuditor:
    def __init__(self):
        self.issues: List[Issue] = []
        self.patterns = self._load_patterns()
        
    def _load_patterns(self) -> Dict:
        """Load detection patterns for common a11y issues"""
        return {
            # Generic alt text
            'generic_alt': {
                'pattern': r'alt=["\'](image|photo|picture|icon|logo|graphic|img)["\']\s*/?>',
                'severity': Severity.MAJOR,
                'wcag': '1.1.1',
                'type': 'Non-descriptive alt text',
                'message': 'Alt text should describe image content/purpose',
                'fix': 'Use descriptive alt text that conveys image meaning'
            },
            
            # Missing alt attribute
            'missing_alt': {
                'pattern': r'<img(?![^>]*alt=)[^>]*>',
                'severity': Severity.CRITICAL,
                'wcag': '1.1.1', 
                'type': 'Missing alt text',
                'message': 'Images must have alt attribute',
                'fix': 'Add alt="" for decorative or descriptive alt text'
            },
            
            # Click handlers on non-semantic elements
            'div_onclick': {
                'pattern': r'<(div|span)(?:[^>]*)\s+onClick=',
                'severity': Severity.CRITICAL,
                'wcag': '4.1.2',
                'type': 'Non-semantic interactive element',
                'message': 'Use semantic button element for click handlers',
                'fix': 'Replace with <button> or add role="button" with keyboard support'
            },
            
            # Ambiguous link text
            'ambiguous_link': {
                'pattern': r'>(click here|read more|more|link|here|go)<\/[aA]>',
                'severity': Severity.MAJOR,
                'wcag': '2.4.4',
                'type': 'Non-descriptive link text',
                'message': 'Link text should describe destination',
                'fix': 'Use descriptive link text or aria-label'
            },
            
            # Form inputs without labels
            'input_no_label': {
                'pattern': r'<[iI]nput(?![^>]*aria-label)(?![^>]*id=["\'][^"\']*["\'][^>]*>[^<]*<[lL]abel[^>]*for=)[^>]*>',
                'severity': Severity.CRITICAL,
                'wcag': '3.3.2',
                'type': 'Form input without label',
                'message': 'Form inputs must have associated labels',
                'fix': 'Add <label> with htmlFor or aria-label'
            },
            
            # Heading level skip
            'heading_skip': {
                'pattern': r'<h1[^>]*>.*?<\/h1>(?:(?!<h2).)*<h[3-6]',
                'severity': Severity.MINOR,
                'wcag': '1.3.1',
                'type': 'Skipped heading level',
                'message': 'Heading hierarchy should not skip levels',
                'fix': 'Use sequential heading levels (h1 → h2 → h3)'
            },
            
            # Positive tabindex
            'positive_tabindex': {
                'pattern': r'tabIndex=["\']?[1-9]\d*["\']?',
                'severity': Severity.MAJOR,
                'wcag': '2.4.3',
                'type': 'Positive tabIndex',
                'message': 'Avoid positive tabIndex values',
                'fix': 'Use tabIndex={0} or {-1}, rely on natural DOM order'
            },
            
            # Missing lang attribute
            'missing_lang': {
                'pattern': r'<html(?![^>]*lang=)[^>]*>',
                'severity': Severity.CRITICAL,
                'wcag': '3.1.1',
                'type': 'Missing page language',
                'message': 'HTML must have lang attribute',
                'fix': 'Add lang="en" or appropriate language code'
            },
            
            # Autofocus without need
            'unnecessary_autofocus': {
                'pattern': r'autoFocus(?:=["\']?true["\']?)?',
                'severity': Severity.MINOR,
                'wcag': '2.4.3',
                'type': 'Unnecessary autoFocus',
                'message': 'Avoid autoFocus except for primary action',
                'fix': 'Remove autoFocus unless critical for user flow'
            },
            
            # Color only indication
            'color_only': {
                'pattern': r'style={{[^}]*color:\s*[^}]*status\s*===\s*["\']error["\']',
                'severity': Severity.MAJOR,
                'wcag': '1.4.1',
                'type': 'Color-only status indication',
                'message': 'Don\'t rely solely on color to convey information',
                'fix': 'Add icon, text, or other visual indicator'
            }
        }
    
    def audit_file(self, file_path: Path) -> List[Issue]:
        """Audit a single file for accessibility issues"""
        issues = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.splitlines()
                
            # Check each pattern
            for pattern_name, pattern_config in self.patterns.items():
                matches = re.finditer(pattern_config['pattern'], content, re.IGNORECASE | re.DOTALL)
                
                for match in matches:
                    # Find line number
                    line_num = content[:match.start()].count('\n') + 1
                    
                    # Get code snippet (3 lines of context)
                    start_line = max(0, line_num - 2)
                    end_line = min(len(lines), line_num + 1)
                    snippet = '\n'.join(lines[start_line:end_line])
                    
                    issue = Issue(
                        file_path=str(file_path),
                        line_number=line_num,
                        severity=pattern_config['severity'],
                        wcag_criterion=pattern_config['wcag'],
                        issue_type=pattern_config['type'],
                        description=pattern_config['message'],
                        code_snippet=snippet,
                        recommendation=pattern_config['fix']
                    )
                    issues.append(issue)
                    
            # Check for custom component patterns
            issues.extend(self._check_custom_components(file_path, content, lines))
            
        except Exception as e:
            print(f"Error auditing {file_path}: {e}", file=sys.stderr)
            
        return issues
    
    def _check_custom_components(self, file_path: Path, content: str, lines: List[str]) -> List[Issue]:
        """Check for custom component accessibility patterns"""
        issues = []
        
        # Check for Heading components without proper level
        heading_pattern = r'<Heading(?![^>]*(?:as=|level=))[^>]*>'
        matches = re.finditer(heading_pattern, content)
        for match in matches:
            line_num = content[:match.start()].count('\n') + 1
            issues.append(Issue(
                file_path=str(file_path),
                line_number=line_num,
                severity=Severity.MAJOR,
                wcag_criterion='1.3.1',
                issue_type='Heading without semantic level',
                description='Heading component missing as or level prop',
                code_snippet=lines[line_num-1] if line_num <= len(lines) else '',
                recommendation='Add as="h2" or level={2} prop'
            ))
        
        # Check for Button with href (should be Link)
        button_link_pattern = r'<Button[^>]*href='
        matches = re.finditer(button_link_pattern, content)
        for match in matches:
            line_num = content[:match.start()].count('\n') + 1
            issues.append(Issue(
                file_path=str(file_path),
                line_number=line_num,
                severity=Severity.MINOR,
                wcag_criterion='4.1.2',
                issue_type='Button used as link',
                description='Button with href should be Link component',
                code_snippet=lines[line_num-1] if line_num <= len(lines) else '',
                recommendation='Use Link component for navigation'
            ))
            
        return issues
    
    def audit_directory(self, directory: Path, extensions: List[str] = None) -> None:
        """Audit all files in directory"""
        if extensions is None:
            extensions = ['.tsx', '.ts', '.jsx', '.js']
            
        for file_path in directory.rglob('*'):
            if file_path.suffix in extensions and 'node_modules' not in str(file_path):
                file_issues = self.audit_file(file_path)
                self.issues.extend(file_issues)
    
    def generate_report(self) -> Dict:
        """Generate audit report"""
        critical_count = len([i for i in self.issues if i.severity == Severity.CRITICAL])
        major_count = len([i for i in self.issues if i.severity == Severity.MAJOR])
        minor_count = len([i for i in self.issues if i.severity == Severity.MINOR])
        
        # Group issues by file
        issues_by_file = {}
        for issue in self.issues:
            if issue.file_path not in issues_by_file:
                issues_by_file[issue.file_path] = []
            issues_by_file[issue.file_path].append(issue)
        
        # Group issues by type
        issues_by_type = {}
        for issue in self.issues:
            if issue.issue_type not in issues_by_type:
                issues_by_type[issue.issue_type] = []
            issues_by_type[issue.issue_type].append(issue)
        
        report = {
            'summary': {
                'total_issues': len(self.issues),
                'critical_issues': critical_count,
                'major_issues': major_count,
                'minor_issues': minor_count,
                'files_analyzed': len(issues_by_file),
                'wcag_compliance': 'FAIL' if critical_count > 0 else 'PASS WITH WARNINGS'
            },
            'issues_by_severity': {
                'critical': [self._issue_to_dict(i) for i in self.issues if i.severity == Severity.CRITICAL],
                'major': [self._issue_to_dict(i) for i in self.issues if i.severity == Severity.MAJOR],
                'minor': [self._issue_to_dict(i) for i in self.issues if i.severity == Severity.MINOR]
            },
            'issues_by_file': {
                file: [self._issue_to_dict(i) for i in issues]
                for file, issues in issues_by_file.items()
            },
            'patterns': {
                issue_type: len(issues)
                for issue_type, issues in issues_by_type.items()
            }
        }
        
        return report
    
    def _issue_to_dict(self, issue: Issue) -> Dict:
        """Convert Issue to dictionary"""
        return {
            'file': issue.file_path,
            'line': issue.line_number,
            'severity': issue.severity.value,
            'wcag': issue.wcag_criterion,
            'type': issue.issue_type,
            'description': issue.description,
            'snippet': issue.code_snippet,
            'fix': issue.recommendation
        }
    
    def print_report(self, report: Dict) -> None:
        """Print formatted report to console"""
        print("\n" + "="*60)
        print("ACCESSIBILITY AUDIT REPORT - WCAG 2.0 AA")
        print("="*60)
        
        print("\n📊 SUMMARY")
        print("-"*40)
        summary = report['summary']
        print(f"Files Analyzed: {summary['files_analyzed']}")
        print(f"Total Issues: {summary['total_issues']}")
        print(f"  🔴 Critical: {summary['critical_issues']}")
        print(f"  🟠 Major: {summary['major_issues']}")
        print(f"  🟡 Minor: {summary['minor_issues']}")
        print(f"\nCompliance Status: {summary['wcag_compliance']}")
        
        if summary['critical_issues'] > 0:
            print("\n🔴 CRITICAL ISSUES (Must Fix)")
            print("-"*40)
            for issue in report['issues_by_severity']['critical'][:5]:
                print(f"\n📍 {issue['file']}:{issue['line']}")
                print(f"   Type: {issue['type']}")
                print(f"   WCAG: {issue['wcag']}")
                print(f"   Fix: {issue['fix']}")
        
        if summary['major_issues'] > 0:
            print("\n🟠 MAJOR ISSUES (Should Fix)")
            print("-"*40)
            for issue in report['issues_by_severity']['major'][:5]:
                print(f"\n📍 {issue['file']}:{issue['line']}")
                print(f"   Type: {issue['type']}")
                print(f"   Fix: {issue['fix']}")
        
        print("\n📈 PATTERN ANALYSIS")
        print("-"*40)
        for pattern, count in sorted(report['patterns'].items(), key=lambda x: x[1], reverse=True)[:5]:
            print(f"  {pattern}: {count} occurrences")
        
        print("\n" + "="*60)

def main():
    """Main entry point"""
    if len(sys.argv) < 2:
        print("Usage: python audit.py <path_to_audit> [--json output.json]")
        sys.exit(1)
    
    path_to_audit = Path(sys.argv[1])
    
    if not path_to_audit.exists():
        print(f"Error: Path {path_to_audit} does not exist")
        sys.exit(1)
    
    auditor = A11yAuditor()
    
    if path_to_audit.is_file():
        issues = auditor.audit_file(path_to_audit)
        auditor.issues = issues
    else:
        auditor.audit_directory(path_to_audit)
    
    report = auditor.generate_report()
    
    # Output JSON if requested
    if len(sys.argv) > 2 and sys.argv[2] == '--json':
        output_file = sys.argv[3] if len(sys.argv) > 3 else 'audit_report.json'
        with open(output_file, 'w') as f:
            json.dump(report, f, indent=2)
        print(f"Report saved to {output_file}")
    
    # Always print to console
    auditor.print_report(report)
    
    # Exit with error if critical issues found
    sys.exit(1 if report['summary']['critical_issues'] > 0 else 0)

if __name__ == '__main__':
    main()