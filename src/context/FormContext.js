import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  
  const [formData, setFormData] = useState(() => {
    const savedLocal = localStorage.getItem('retro_pc_data');
    
    const cookieData = Cookies.get('retro_pc_cookie');
    const savedCookie = cookieData ? JSON.parse(cookieData) : null;

    return savedCookie || (savedLocal ? JSON.parse(savedLocal) : {
      username: '', 
      bio: '', 
      location: 'UAE', 
      language: 'en', 
      gender: 'Female', 
      image: null, 
      video: null, 
      isAgreed: false
    });
  });

  useEffect(() => {
    const request = indexedDB.open("RetroPC_DB", 1);
    request.onupgradeneeded = (e) => e.target.result.createObjectStore("media");
    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction("media", "readonly");
      const store = tx.objectStore("media");
      store.get("img").onsuccess = (ev) => ev.target.result && setFormData(p => ({...p, image: ev.target.result}));
      store.get("vid").onsuccess = (ev) => ev.target.result && setFormData(p => ({...p, video: ev.target.result}));
    };
  }, []);

 useEffect(() => {
    const { image, video, ...textData } = formData;
    
    
    localStorage.setItem('retro_pc_data', JSON.stringify(textData));
    
    Cookies.set('retro_pc_cookie', JSON.stringify(textData), { expires: 3 });

    
    

  
    const request = indexedDB.open("RetroPC_DB", 1);
    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction("media", "readwrite");
      if (image && typeof image === 'string' && image.startsWith('data:')) {
        tx.objectStore("media").put(image, "img");
      }
      if (video && typeof video === 'string' && video.startsWith('data:')) {
        tx.objectStore("media").put(video, "vid");
      }
    };
  }, [formData]);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  
  const updateFileField = (field, file) => {
    const reader = new FileReader();
    reader.onloadend = () => updateField(field, reader.result);
    if (file) reader.readAsDataURL(file);
  };

  return (
    <FormContext.Provider value={{ formData, updateField, updateFileField }}>
      {children}
    </FormContext.Provider>
  );
};