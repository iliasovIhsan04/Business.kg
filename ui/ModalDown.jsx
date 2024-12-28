import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../assets/styles/colors";

export default function ModalDown({
  paddingNone,
  dark,
  modal,
  setModal,
  children,
}) {
  const toggleModal = () => {
    setModal(false);
  };

  const stylesModal = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    content: {
      width: "100%",
      backgroundColor: dark ? colors.phon : colors.white,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      paddingHorizontal: !paddingNone && 16,
      paddingBottom: 30,
    },
    clip: {
      alignSelf: "center",
      marginTop: 16,
      width: 74,
      height: 4,
      borderRadius: 10,
      backgroundColor: colors.gray,
    },
  });

  return (
    <View>
      <Modal
        isVisible={modal}
        swipeDirection="down"
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        style={stylesModal.modal}
      >
        <View style={stylesModal.content}>
          <View style={stylesModal.clip}></View>
          {children}
        </View>
      </Modal>
    </View>
  );
}
