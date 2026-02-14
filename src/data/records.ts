export interface MedicalRecord {
  id: string;
  type: "prescription" | "test_result" | "session_note";
  title: string;
  doctor: string;
  date: string;
  summary: string;
  details: string;
}

export const medicalRecords: MedicalRecord[] = [
  {
    id: "r1",
    type: "prescription",
    title: "Amoxicillin 500mg",
    doctor: "Dr. Sarah Mitchell",
    date: "2026-02-10",
    summary: "Prescribed for bacterial throat infection. 7-day course.",
    details: "Medication: Amoxicillin 500mg\nDosage: 1 capsule, 3 times daily\nDuration: 7 days\nInstructions: Take with food. Complete the full course even if symptoms improve.\nRefills: 0\nPrescribed by: Dr. Sarah Mitchell, GP",
  },
  {
    id: "r2",
    type: "test_result",
    title: "Complete Blood Count (CBC)",
    doctor: "Dr. James Chen",
    date: "2026-02-05",
    summary: "All values within normal range. No abnormalities detected.",
    details: "Test: Complete Blood Count (CBC)\nDate Collected: Feb 5, 2026\n\nResults:\n- White Blood Cells: 6.8 x10^9/L (Normal: 4.0-11.0)\n- Red Blood Cells: 4.9 x10^12/L (Normal: 4.5-5.5)\n- Hemoglobin: 14.2 g/dL (Normal: 13.0-17.0)\n- Platelets: 245 x10^9/L (Normal: 150-400)\n\nInterpretation: All values within normal reference range.\nOrdered by: Dr. James Chen, Cardiologist",
  },
  {
    id: "r3",
    type: "session_note",
    title: "Annual Physical Examination",
    doctor: "Dr. Michael Thompson",
    date: "2026-01-20",
    summary: "Routine annual check-up. Overall health status: Good.",
    details: "Visit Type: Annual Physical Examination\nDate: January 20, 2026\n\nVitals:\n- Blood Pressure: 120/78 mmHg\n- Heart Rate: 72 bpm\n- Temperature: 98.6°F\n- BMI: 24.1\n\nFindings: Patient is in good overall health. No concerning findings.\nRecommendations:\n- Continue regular exercise routine\n- Follow up in 12 months for next annual exam\n- Flu vaccine administered\n\nProvider: Dr. Michael Thompson, GP",
  },
  {
    id: "r4",
    type: "test_result",
    title: "Lipid Panel",
    doctor: "Dr. James Chen",
    date: "2026-01-15",
    summary: "Cholesterol levels slightly elevated. Lifestyle modifications recommended.",
    details: "Test: Lipid Panel\nDate Collected: Jan 15, 2026\n\nResults:\n- Total Cholesterol: 215 mg/dL (Desirable: <200)\n- LDL: 138 mg/dL (Near Optimal: 100-129)\n- HDL: 52 mg/dL (Normal: >40)\n- Triglycerides: 125 mg/dL (Normal: <150)\n\nInterpretation: Total cholesterol and LDL slightly elevated.\nRecommendation: Dietary changes and increased physical activity.\nOrdered by: Dr. James Chen, Cardiologist",
  },
  {
    id: "r5",
    type: "prescription",
    title: "Vitamin D3 2000 IU",
    doctor: "Dr. Sarah Mitchell",
    date: "2026-01-10",
    summary: "Supplement for Vitamin D deficiency.",
    details: "Medication: Vitamin D3 2000 IU\nDosage: 1 tablet daily\nDuration: 90 days\nInstructions: Take with a meal for optimal absorption.\nRefills: 2\nPrescribed by: Dr. Sarah Mitchell, GP",
  },
];
