export const GRADE_SCALE = [
  { grade: 'A', minScore: 70, maxScore: 100, point: 5.0, remark: 'Excellent' },
  { grade: 'B', minScore: 60, maxScore: 69, point: 4.0, remark: 'Very Good' },
  { grade: 'C', minScore: 50, maxScore: 59, point: 3.0, remark: 'Good' },
  { grade: 'D', minScore: 45, maxScore: 49, point: 2.0, remark: 'Fair' },
  { grade: 'E', minScore: 40, maxScore: 44, point: 1.0, remark: 'Pass' },
  { grade: 'F', minScore: 0, maxScore: 39, point: 0.0, remark: 'Fail' },
];

export function scoreToGrade(score) {
  for (const g of GRADE_SCALE) {
    if (score >= g.minScore && score <= g.maxScore) return g;
  }
  return GRADE_SCALE[GRADE_SCALE.length - 1];
}

export function calculateGPA(results) {
  if (!results || results.length === 0) return 0;
  let totalPoints = 0;
  let totalCredits = 0;
  
  for (const r of results) {
    const grade = scoreToGrade(r.score);
    totalPoints += grade.point * r.creditUnits;
    totalCredits += r.creditUnits;
  }
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

export function calculateCGPA(allSemesterResults) {
  if (!allSemesterResults || allSemesterResults.length === 0) return 0;
  let totalPoints = 0;
  let totalCredits = 0;
  
  for (const semester of allSemesterResults) {
    for (const r of semester.results) {
      const grade = scoreToGrade(r.score);
      totalPoints += grade.point * r.creditUnits;
      totalCredits += r.creditUnits;
    }
  }
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

export function getClassification(cgpa) {
  if (cgpa >= 4.5) return { label: 'First Class', color: 'var(--color-success)' };
  if (cgpa >= 3.5) return { label: 'Second Class Upper', color: 'var(--color-info)' };
  if (cgpa >= 2.5) return { label: 'Second Class Lower', color: 'var(--color-accent)' };
  if (cgpa >= 1.5) return { label: 'Third Class', color: 'var(--color-warning)' };
  if (cgpa >= 1.0) return { label: 'Pass', color: 'var(--color-error)' };
  return { label: 'Fail', color: 'var(--color-error)' };
}

export function getGPAColor(gpa) {
  if (gpa >= 4.5) return 'var(--color-success)';
  if (gpa >= 3.5) return 'var(--color-info)';
  if (gpa >= 2.5) return 'var(--color-accent)';
  if (gpa >= 1.5) return 'var(--color-warning)';
  return 'var(--color-error)';
}
