export default function OfficialBadge({ official }) {
  return (
    <span className={`badge ${official ? 'badge-official' : 'badge-unofficial'}`}>
      {official ? 'Official' : 'Unofficial'}
    </span>
  );
}
