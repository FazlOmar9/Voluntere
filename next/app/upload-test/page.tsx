'use client';

import React from 'react';

const Page = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    formData.append('type', 'community');
    formData.append('id', '80085');


    if (fileInput.files && (fileInput.files || []).length > 0) {
      formData.append('file', fileInput.files[0]);

      try {
        const response = await fetch('http://localhost:3010/uploads', {
          method: 'POST',
          body: formData,
          // Do not set Content-Type header when sending FormData
          // The browser will set it with the correct boundary
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <input type='file' name='file' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Page;
