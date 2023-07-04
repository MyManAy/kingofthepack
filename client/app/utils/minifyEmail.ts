const emailMinify = (email: string) => {
  const [username, serverAndDomain] = email.trim().split("@");
  const [bareUsername, _] = username.split("+");
  const standardizedUsername = bareUsername.replaceAll(".", "").toLowerCase();

  return `${standardizedUsername}@${serverAndDomain}`;
};

export default emailMinify;
