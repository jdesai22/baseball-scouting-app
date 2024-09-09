import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Button } from "react-native";
import ReportTable from "@/components/ReportTable";

const sortTableData = (data: (number | string)[][]): (number | string)[][] => {
  return data.sort((a, b) => {
    const floatA = parseFloat(a[1] as string);
    const floatB = parseFloat(b[1] as string);
    return floatB - floatA;
  });
};

const castTableDataToString = (data: (number | string)[][]): string[][] => {
  return data.map((row) => row.map((cell) => cell.toString()));
};

export default function TabTwoScreen() {
  const exampleData = {
    tableHead: ["Rank", "Name", "Ovr. Score", "Location"],
    tableData: [
      ["2", 1.5, "3"],
      ["b", 3.5, "c"],
      ["2", 2.3, "3"],
      ["b", 1.2, "c"],
    ],
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  const sortedTableData = castTableDataToString(
    sortTableData(exampleData.tableData)
  );
  const totalPages = Math.ceil(sortedTableData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = sortedTableData.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scouting Report</Text>
      <ReportTable
        tableHead={exampleData.tableHead}
        tableData={displayedData}
      />
      <View style={styles.pagination}>
        <Button
          title="Previous"
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        />
        <Text
          style={styles.pageInfo}
        >{`Page ${currentPage} of ${totalPages}`}</Text>
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 50,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  pageInfo: {
    fontSize: 16,
  },
});
