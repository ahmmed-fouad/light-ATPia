import { useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import StepHeader from '../components/StepHeader';
import StepTitle from '../components/StepTitle';
import CustomCard from '../../../components/CustomCard';
import CustomInput from '../../../components/CustomInput';
import StepFooterButton from '../../../components/StepFooterButton';
import { useFormStore } from '../stores/formStore';
import type { FormStoreState } from '../stores/formStore';
import { useFormNavigation } from '../hooks/useFormNavigation';
import { router } from 'expo-router';

const TOTAL_STEPS = 8;

const TrackerStep1Screen = () => {
  const { step, nextStep, prevStep } = useFormNavigation();
  const name = useFormStore((s: FormStoreState) => s.data.name || '');
  const setData = useFormStore((s: FormStoreState) => s.setData);
  const inputRef = useRef(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StepHeader
        onBack={prevStep}
        onSkip={nextStep}
      />
     
      <View style={styles.centerArea}>
        <StepTitle
          title="What is your name?"
          highlight="name"
          subtitle="We will use this data to give you a better diet type for you"
          step={step}
          total={TOTAL_STEPS}
        />
        <View style={styles.inputWrap}>
          {/* <CustomCard style={styles.card}> */}
            <CustomInput
              value={name}
              onChangeText={text => setData({ name: text })}
              placeholder="Your name"
              variant="filled"
              inputStyle={styles.inputText}
              style={styles.inputBox}
            />
          {/* </CustomCard> */}
        </View>
        <TouchableOpacity style={{ position: 'absolute',  width: 60, height: 30, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'green'}} onPress={() => router.push("/(main)/home")}>
        <Text style={{ color: 'white' }}>Home</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.footerBtnWrap}>
        <StepFooterButton
          progress={step / TOTAL_STEPS}
          onPress={nextStep}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    
  },
  inputWrap: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
    
  },
  // card: {
  //   width: 320,
  //   minHeight: 60,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "transparent",
  //   // borderColor: '#D1D5DB',
  //   borderWidth: 2,
  //   borderRadius: 16,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.04,
  //   shadowRadius: 2,
  //   elevation: 1,
  //   marginTop: 0,
  //   marginBottom: 0,
  //   paddingVertical: 0,
  // },
  inputBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    minHeight: 48,
    
  },
  inputText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 25,
    fontFamily: "Inter_700Bold",
  },
  footerBtnWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
});

export default TrackerStep1Screen; 