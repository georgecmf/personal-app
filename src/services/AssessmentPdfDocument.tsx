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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
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
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  photo: {
    width: 160,
    height: 220,
    objectFit: "cover",
    border: "1 solid #d1d5db",
    borderRadius: 6,
  },

});


export default function AssessmentPdfDocument({
  assessment,
}: Props) {

  const formattedDate = new Date(
  assessment.assessment_date
).toLocaleDateString("pt-BR");

  return (

    <Document>

      {/* Página 1 */}
      <Page size="A4" style={styles.page}>

        <Text style={styles.title}>
          AVALIAÇÃO FÍSICA
        </Text>

        <View
          style={{
            marginBottom: 20,
            borderBottom: "1 solid #d1d5db",
            paddingBottom: 10,
          }}
        >
          <Row
            label="Data da avaliação"
            value={formattedDate}
          />

          <Row
            label="Peso"
            value={`${assessment.weight} kg`}
          />

          <Row
            label="% Gordura"
            value={`${assessment.body_fat}%`}
          />

          <Row
            label="Massa muscular"
            value={`${assessment.muscle_mass} kg`}
          />
        </View>


          <Text style={styles.sectionTitle}>
            Medidas principais
          </Text>

          <View>

            <Row
              label="Peito"
              value={`${assessment.chest} cm`}
            />

            <Row
              label="Cintura"
              value={`${assessment.waist} cm`}
            />

            <Row
              label="Abdômen"
              value={`${assessment.abdomen} cm`}
            />

          </View>

          <Text style={styles.sectionTitle}>
            Medidas corporais
          </Text>

          <View>

            <Row label="Quadril" value={`${assessment.hip} cm`} />
            <Row label="Braço Direito" value={`${assessment.right_arm} cm`} />
            <Row label="Braço Esquerdo" value={`${assessment.left_arm} cm`} />
            <Row label="Antebraço Direito" value={`${assessment.right_forearm} cm`} />
            <Row label="Antebraço Esquerdo" value={`${assessment.left_forearm} cm`} />
            <Row label="Coxa Direita" value={`${assessment.right_thigh} cm`} />
            <Row label="Coxa Esquerda" value={`${assessment.left_thigh} cm`} />
            <Row label="Panturrilha Direita" value={`${assessment.right_calf} cm`} />
            <Row label="Panturrilha Esquerda" value={`${assessment.left_calf} cm`} />

          </View>

          <Text
            style={{
              position: "absolute",
              bottom: 15,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 10,
              color: "#94a3b8",
            }}
          >
            Relatório de Avaliação Física
          </Text>

      </Page>



      {/* Página 2 */}
      <Page size="A4" style={styles.page}>


        <Text style={styles.sectionTitle}>
          Observações
        </Text>


        <View style={styles.observation}>
          <Text>
            {assessment.observations || "Nenhuma observação."}
          </Text>
        </View>

        <Text
        style={{
          position: "absolute",
          bottom: 15,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 10,
          color: "#94a3b8",
        }}
      >
        Relatório de Avaliação Física
      </Text>

      </Page>



      {/* Página 3 */}
      <Page size="A4" style={styles.page}>


        <Text style={styles.sectionTitle}>
          Fotos da avaliação
        </Text>

        <View
          style={{
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >

          <Text>Frente</Text>

          <Text>Lado</Text>

          <Text>Costas</Text>

        </View>

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

          <Text
          style={{
            position: "absolute",
            bottom: 15,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 10,
            color: "#94a3b8",
          }}
        >
          Relatório de Avaliação Física
        </Text>

      </Page>


    </Document>

  );
}


function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1 solid #e5e7eb",
        paddingVertical: 6,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: "#64748b",
        }}
      >
        {label}
      </Text>

      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {value}
      </Text>
    </View>
  );
}