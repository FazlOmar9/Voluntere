'use client';

import { Modal, ModalOverlay, ModalContent, ModalBody, Icon, Text, Box } from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  children: string;
  link: string;
  isSuccess: boolean;
}


const MessageModal = ({ isOpen, children: message, link, isSuccess }: Props) => {

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height='100%'>
            <Icon as={isSuccess ? FaCheckCircle : FaTimesCircle} w={10} h={10} color={isSuccess ? 'green.500' : 'red.500'} />
            <Text mt={4}>{message}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;