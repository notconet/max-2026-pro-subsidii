import { Panel } from '@maxhub/max-ui';

const renderValue = (value: unknown, seen = new WeakSet<object>()): React.ReactNode => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value);
  if (typeof value === 'function') return `[function ${value.name || 'anonymous'}]`;
  if (typeof value === 'symbol') return value.toString();

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';

    return (
      <ul>
        {value.map((item, index) => (
          <li key={`${index}-${String(item)}`}>
            <strong>[{index}]</strong>: {renderValue(item, seen)}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === 'object') {
    if (seen.has(value)) return '[Circular]';
    seen.add(value);

    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';

    return (
      <ul>
        {entries.map(([key, nestedValue]) => (
          <li key={key}>
            <strong>{key}</strong>: {renderValue(nestedValue, seen)}
          </li>
        ))}
      </ul>
    );
  }

  return String(value);
};

const App = () => {
  const webApp = (window as any).WebApp;

  const appEntries = webApp ? Object.entries(webApp as Record<string, unknown>) : [];

  console.log('WebApp:', webApp);
  console.log('WebApp entries:', appEntries);

  return (
    <Panel mode={"primary"} className="panel">
      <div>
        {webApp ? 'MAX WebApp connected' : 'MAX WebApp is not available here'}
      </div>

      {webApp && appEntries.length > 0 && (
        <ul>
          {appEntries.map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>
              {': '}
              {renderValue(value)}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
};

export default App;
