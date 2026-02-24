const MachineNameRegex = /[A-Za-z]{10}\d{3}|[A-Za-z]{5}\d{2}[A-Za-z]{5}\d{3}|[A-Za-z]{2}\d[A-Za-z]{7}\d{3}|[A-Za-z]{3}\d{2}[A-Za-z]{5}\d{3}|[A-Za-z]{12}\d{2,3}|[A-Za-z]{5}\d{2}[A-Za-z]{5}\d{2}|[A-Za-z]{4}\d[A-Za-z]{5}\d{3}\s|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ig;

export function ParseServerNames(Description: string) {
  const Servers = Description.match(MachineNameRegex);
  if (Servers == null) {
    return ['No Servers Found'];
  }
  else {
    return Servers;
  }
}

export function isApplication(name: string) {
  let app: boolean;
  if (!name.match(MachineNameRegex)) {
    app = true;
  } else {
    app = false;
  }

  return app;
}
