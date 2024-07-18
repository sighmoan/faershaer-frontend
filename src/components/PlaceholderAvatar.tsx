export const PlaceholderAvatar = ({ personName }: { personName: string }) => {
  const caps = personName.replace(/[a-z]/g, "");
  if (caps.length > 0) {
    return caps;
  }

  return personName[0].toUpperCase();
};
