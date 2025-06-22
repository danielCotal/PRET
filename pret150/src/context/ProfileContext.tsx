import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

// 1. Definimos la "forma" de los datos que compartiremos
interface ProfileContextType {
  profile: { nombre: string; correo: string; rol: string; };
  avatarUrl: string;
  setProfile: (profile: { nombre: string; correo: string; rol: string; }) => void;
  setUploadedImage: (image: string | null) => void;
  setAvatarColor: (color: string) => void;
}

// 2. Creamos el Context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// 3. Creamos el "Proveedor" del Context
// Este componente envolverá nuestra aplicación y contendrá toda la lógica y el estado.
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState({ nombre: 'Invitado', correo: '', rol: 'Usuario' });
  const [avatarColor, setAvatarColor] = useState('3b82f6');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState('');

  // Lógica para cargar el perfil desde localStorage al inicio
  useEffect(() => {
    const userProfileString = localStorage.getItem('userProfile');
    if (userProfileString) {
      setProfile(JSON.parse(userProfileString));
    }
  }, []);

  // Lógica para actualizar el avatar cuando cambie el nombre, color o se suba una imagen
  useEffect(() => {
    const newAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.nombre
    )}&background=${avatarColor}&color=fff&size=128`;
    setGeneratedAvatarUrl(newAvatarUrl);
  }, [profile.nombre, avatarColor]);

  // El valor final del avatar: la imagen subida tiene prioridad
  const avatarUrl = uploadedImage || generatedAvatarUrl;

  const value = {
    profile,
    avatarUrl,
    setProfile,
    setUploadedImage,
    setAvatarColor
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

// 4. Creamos un "Hook" personalizado para usar el context fácilmente
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile debe ser usado dentro de un ProfileProvider');
  }
  return context;
};