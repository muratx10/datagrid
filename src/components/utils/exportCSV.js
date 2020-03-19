import { ExportToCsv } from 'export-to-csv';

const exportCSV = (obj, invisibleColumns) => {
  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Data CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);
  const newData = obj.map((i) => {
    const location = `${i.locationName.city} ${i.locationName.zipcode}`;
    const status = i.isActive === true ? 'ACTIVE' : 'LOCKED';
    const residence = i.residence === true ? 'resident' : 'non-resident';
    const birthDate = invisibleColumns.includes('birthDate') ? '' : i.birthDate;
    const company = invisibleColumns.includes('companyName') ? '' : i.companyName;
    return {
      ID: i.id,
      NAME: i.name,
      RESIDENCE: residence,
      'DATE OF BIRTH': birthDate,
      ADDRESS: location,
      COMPANY: company,
      CURRENCY: i.currency,
      BALANCE: i.amount,
      CARD: i.card,
      STATUS: status,
    };
  });
  csvExporter.generateCsv(newData);
};

export default exportCSV;
