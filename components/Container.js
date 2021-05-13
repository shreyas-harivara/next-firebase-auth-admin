import React from "react";
import NextLink from "next/link";
import { useColorMode, Button, Flex, Box, IconButton } from "@chakra-ui/core";
import styled from "@emotion/styled";

export default function Container({ children }) {
  return (
    <>
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
      </Flex>
    </>
  );
}
