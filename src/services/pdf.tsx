import { pdf } from "@react-pdf/renderer";
import AssessmentPdfDocument from "./AssessmentPdfDocument";

import type { PhysicalAssessment } from "./physicalAssessments";


export async function generateAssessmentPdf(
  assessment: PhysicalAssessment,
  fileName: string
) {

  const blob = await pdf(
    <AssessmentPdfDocument assessment={assessment} />
  ).toBlob();


  const url = URL.createObjectURL(blob);


  const link = document.createElement("a");

  link.href = url;
  link.download = `${fileName}.pdf`;

  link.click();


  URL.revokeObjectURL(url);
}