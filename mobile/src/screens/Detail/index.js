import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as MailComposer from 'expo-mail-composer';

import imgLogo from '../../../assets/logo.png';

import styles from './styles';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { incident } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const sendMail = email => {
    MailComposer.composeAsync({
      subject: 'Herói do caso: cadelinha atropelada...',
      recipients: [email],
      body: 'mensagem...'
    });
  };

  const sendWhatsapp = wpp => {
    Linking.openURL(`whatsapp://send?phone=${wpp}&t=mensagem...`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={imgLogo} />

        <TouchableOpacity
          onPress={() => {
            navigateBack();
          }}
        >
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, styles.noMarginTop]}>Ong:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>R$ {incident.value}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói deste caso</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              try {
                sendWhatsapp(incident.whatsapp);
              } catch (error) {}
            }}
          >
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              sendMail(incident.email);
            }}
          >
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
