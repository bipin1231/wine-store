export const openPopup = (url, name, width = 500, height = 600) => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return window.open(
    url,
    name,
    `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes,status=1`
  );
};
