// components/SocialAuthButton.tsx
import supabase from '../lib/supabaseClient';

interface SocialAuthButtonProps {
  provider: 'google' | 'facebook' | 'github'; // Add other providers if needed
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({ provider }) => {
  const handleSocialLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) {
        console.error(`Error signing in with ${provider}:`, error.message);
        alert(`Error: ${error.message}. Please check if ${provider} is enabled in your Supabase project.`);
      } else {
        alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful! Redirecting...`);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } catch (err) {
      console.error(`Unexpected error during ${provider} login:`, err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`w-full py-3 rounded-lg transition-all duration-300 ${
        provider === 'google'
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      Sign In with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  );
};

export default SocialAuthButton;
