import React from 'react';
import { Text, View, Button } from 'react-native';
import { Style } from './Style';
import AppStyles from '../../styles/AppStyles';
import Modal from 'react-native-modal';

export const CustomModal = (props) => {
  return (
    <Modal animationIn="slideInUp" isVisible={props.visible}>
      <View style={Style.centeredView}>
        <View style={[Style.modalView, props.containerStyle]}>
          <View style={AppStyles.formGroup}>
            <Text style={[AppStyles.text, AppStyles.textBold]}>
              {props.title}
            </Text>
          </View>
          <View style={AppStyles.formGroup}>{props.body}</View>
          <View style={[AppStyles.rowFlex, Style.footer]}>
            {props.onCancel && (
              <View style={Style.footerButtonView}>
                <Button
                  title={props.cancelText || 'Cancel'}
                  onPress={props.onCancel}
                />
              </View>
            )}
            {props.onConfirm && (
              <View style={Style.footerButtonView}>
                <Button
                  title={props.confirmText || 'OK'}
                  onPress={props.onConfirm}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}