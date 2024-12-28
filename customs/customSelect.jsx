import React, { useState } from "react";
import { Modal, View, Text, Picker, Button, StyleSheet } from "react-native";
import { useStateCar } from "../context/stateCarContext";

const CustomSelect = ({ label }) => {
  const { selectData, setSelectData, fetchStepData, handleSelect } = useStateCar();
  const [modalVisible, setModalVisible] = useState(false);

  const resetSelection = () => {
    setSelectData({
      mark: { id: 0, name: "", data: [] },
      model: { id: 0, name: "", data: [] },
      generation: { id: 0, name: "", data: [] },
    });
    setModalVisible(true);
  };

  return (
    <View>
      <Button title={label} onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Выбор автомобиля</Text>
            <Text style={styles.label}>Марка:</Text>
            <Picker
              selectedValue={selectData.mark.id}
              onValueChange={(value) => {
                const selectedItem = selectData.mark.data.find(
                  (item) => item.id === value
                );
                handleSelect("mark", selectedItem);
              }}
            >
              <Picker.Item label="Выберите марку" value={0} />
              {selectData.mark.data.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>

            {selectData.mark.id !== 0 && (
              <>
                <Text style={styles.label}>Модель:</Text>
                <Picker
                  selectedValue={selectData.model.id}
                  onValueChange={(value) => {
                    const selectedItem = selectData.model.data.find(
                      (item) => item.id === value
                    );
                    handleSelect("model", selectedItem);
                  }}
                >
                  <Picker.Item label="Выберите модель" value={0} />
                  {selectData.model.data.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                  ))}
                </Picker>
              </>
            )}
            {selectData.model.id !== 0 && (
              <>
                <Text style={styles.label}>Поколение:</Text>
                <Picker
                  selectedValue={selectData.generation.id}
                  onValueChange={(value) => {
                    const selectedItem = selectData.generation.data.find(
                      (item) => item.id === value
                    );
                    handleSelect("generation", selectedItem);
                    setModalVisible(false);
                  }}
                >
                  <Picker.Item label="Выберите поколение" value={0} />
                  {selectData.generation.data.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                  ))}
                </Picker>
              </>
            )}

            <Button title="Сбросить выбор" onPress={resetSelection} />
            <Button title="Закрыть" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default CustomSelect;
