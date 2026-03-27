'use client';

import { useState } from 'react';
import ContactSellerModal from './ContactSellerModal';

interface ContactSellerModalWrapperProps {
  sellerName: string;
  productTitle: string;
}

export default function ContactSellerModalWrapper({
  sellerName,
  productTitle,
}: ContactSellerModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
      >
        Contact Seller
      </button>
      <ContactSellerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sellerName={sellerName}
        productTitle={productTitle}
      />
    </>
  );
}
