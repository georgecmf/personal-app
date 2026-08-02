import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import type { PhysicalAssessment } from "./physicalAssessments";


type Props = {
  assessment: PhysicalAssessment;
};


const styles = StyleSheet.create({

  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },

  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  card: {
    width: "45%",
    padding: 10,
    backgroundColor: "#f1f5f9",
    borderRadius: 5,
  },

  label: {
    fontSize: 10,
    color: "#64748b",
  },

  value: {
    fontSize: 14,
    fontWeight: "bold",
  },

  observation: {
    padding: 10,
    backgroundColor: "#f1f5f9",
    minHeight: 80,
  },

  photos: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  photo: {
    width: 160,
    height: 220,
    objectFit: "cover",
  },

});


export default function AssessmentPdfDocument({
  assessment,
}: Props) {

  return (

    <Document>

      {/* Página 1 */}
      <Page size="A4" style={styles.page}>

        <Text style={styles.title}>
          Avaliação Física
        </Text>


        <Text>
          Data: {assessment.assessment_date}
        </Text>


        <Text style={styles.sectionTitle}>
          Medidas principais
        </Text>


        <View style={styles.grid}>

          <Info
            title="Peso"
            value={`${assessment.weight} kg`}
          />

          <Info
            title="% Gordura"
            value={`${assessment.body_fat}%`}
          />

          <Info
            title="Massa muscular"
            value={`${assessment.muscle_mass} kg`}
          />


          <Info
            title="Peito"
            value={`${assessment.chest} cm`}
          />

          <Info
            title="Cintura"
            value={`${assessment.waist} cm`}
          />

          <Info
            title="Abdômen"
            value={`${assessment.abdomen} cm`}
          />

        </View>


      </Page>



      {/* Página 2 */}
      <Page size="A4" style={styles.page}>


        <Text style={styles.sectionTitle}>
          Medidas corporais
        </Text>


        <View style={styles.grid}>

          <Info title="Quadril" value={`${assessment.hip} cm`} />

          <Info title="Braço Direito" value={`${assessment.right_arm} cm`} />

          <Info title="Braço Esquerdo" value={`${assessment.left_arm} cm`} />

          <Info title="Antebraço Direito" value={`${assessment.right_forearm} cm`} />

          <Info title="Antebraço Esquerdo" value={`${assessment.left_forearm} cm`} />

          <Info title="Coxa Direita" value={`${assessment.right_thigh} cm`} />

          <Info title="Coxa Esquerda" value={`${assessment.left_thigh} cm`} />

          <Info title="Panturrilha Direita" value={`${assessment.right_calf} cm`} />

          <Info title="Panturrilha Esquerda" value={`${assessment.left_calf} cm`} />

        </View>


        <Text style={styles.sectionTitle}>
          Observações
        </Text>


        <View style={styles.observation}>
          <Text>
            {assessment.observations || "Nenhuma observação."}
          </Text>
        </View>


      </Page>



      {/* Página 3 */}
      <Page size="A4" style={styles.page}>


        <Text style={styles.sectionTitle}>
          Fotos da avaliação
        </Text>


        <View style={styles.photos}>

          {assessment.front_photo && (
            <Image
              src={assessment.front_photo}
              style={styles.photo}
            />
          )}


          {assessment.side_photo && (
            <Image
              src={assessment.side_photo}
              style={styles.photo}
            />
          )}


          {assessment.back_photo && (
            <Image
              src={assessment.back_photo}
              style={styles.photo}
            />
          )}

        </View>


      </Page>


    </Document>

  );
}



function Info({
  title,
  value,
}: {
  title:string;
  value:string;
}) {

  return (

    <View style={styles.card}>

      <Text style={styles.label}>
        {title}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>

  );

}