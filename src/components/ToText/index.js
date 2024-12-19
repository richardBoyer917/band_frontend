export const ToPhone = ({ className, phoneNumber }) => {
  const realNumber = phoneNumber.replace(/\D/g, "");
  return (
    <a href={`tel:+${realNumber}`} rel="noreferrer" target="_blank">
      <span className={className}>{phoneNumber}</span>
    </a>
  );
};

export const ToEmail = ({ className, email }) => {
  return (
    <a href={`mailto:+${email}`} rel="noreferrer" target="_blank">
      <span className={className}>{email}</span>
    </a>
  );
};
