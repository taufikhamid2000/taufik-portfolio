// components/MessageBanner.tsx
interface MessageBannerProps {
    message: string;
  }
  
  const MessageBanner: React.FC<MessageBannerProps> = ({ message }) => {
    const isSuccess = message.includes('successful');
  
    return (
      <div
        className={`fixed top-0 left-0 w-full p-4 text-center font-bold ${
          isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {message}
      </div>
    );
  };
  
  export default MessageBanner;
  