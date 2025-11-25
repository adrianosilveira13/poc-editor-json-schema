import TopBar from '../TopBar';

export default function TopBarExample() {
  return (
    <TopBar
      onImport={() => console.log('Import clicked')}
      onExport={() => console.log('Export clicked')}
      onSave={() => console.log('Save clicked')}
      hasUnsavedChanges={true}
    />
  );
}
