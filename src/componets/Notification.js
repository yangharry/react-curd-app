const Notification = ({ status, message }) => {
  return (
    <div
      className={`${
        status === 'delete' ? 'bg-red-500' : 'bg-green-500'
      } flex items-center justify-center font-bold text-white rounded p-2`}
    >
      <div>{message}</div>
    </div>
  );
};

export default Notification;
