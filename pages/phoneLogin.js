import React, { useEffect, useState } from "react";
import Link from "next/link";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/core";

export default function PhoneLogin({ props }) {
  firebaseClient();
  const toast = useToast();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const setUpRecaptcha = ({ className }) => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(className, {
      size: "invisible",
      callback: function (response) {
        // console.log("Captcha Resolved");
      },
      expired: function () {
        // console.log("Captcha failure");
      },
      defaultCountry: "IN",
      isolate: false,
    });
  };

  useEffect(() => {
    setUpRecaptcha({ className: "astro-app-re-capcha" });
  }, []);

  const onLoginClicked = async () => {};

  const SendOtp = async () => {
    const appVerifier = window.recaptchaVerifier;
    const body = {
      mobileNumber: `+91${phone}`,
      verifier: appVerifier,
    };
    firebase
      .auth()
      .signInWithPhoneNumber(body.mobileNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast({
            title: "Success",
            description: "Otp sent",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
      })
      .catch(function (error) {
        const message = error.message;
        toast({
          title: "An error occurred.",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const onSubmitOtp = () => {
    let optConfirm = window.confirmationResult;

   
      optConfirm
        .confirm(otp)
        .then((result) => {
            console.log("my success result ", result);
            window.location.href = "/";
        })
        .catch(function (error) {
            const message = error.message;
            toast({
              title: "An error occurred.",
              description: message,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
    
  };

  return (
    <Flex>
      <Box w={500} p={4} my={12} mx="auto">
        <Heading textAlign="center" as="h2">
          Login
        </Heading>
        <FormControl>
          <FormLabel htmlFor="email">Phone</FormLabel>
          <Input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            id="emailAddress"
            value={phone}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            We'll never share your number.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Otp</FormLabel>
          <Input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            id="pass"
            value={otp}
            aria-describedby="password-helper-text"
          />
        </FormControl>
        <Stack justify="center" mt={6} isInline spacing={10}>
          <Button
            minWidth="40%"
            variant="solid"
            variantColor="blue"
            onClick={SendOtp}
          >
            Send Otp
          </Button>
          <Button
            minWidth="40%"
            variant="solid"
            variantColor="green"
            onClick={onSubmitOtp}
          >
            Verify Otp
          </Button>
        </Stack>
      </Box>
      <div id="astro-app-re-capcha"></div>
    </Flex>
  );
}
