// Grey shimmering placeholders shown while data loads.

export const Skeleton = ({ h = 240, w = '100%', r = 8 }) => (
  <div
    className="skel"
    style={{ height: h, width: w, borderRadius: r }}
    aria-hidden="true"
  />
);

export const GridSkeleton = ({ n = 8 }) => (
  <div className="grid">
    {Array.from({ length: n }, (_, i) => (
      <div key={i}>
        <Skeleton h={300} />
        <Skeleton h={16} w="70%" />
        <Skeleton h={16} w="30%" />
      </div>
    ))}
  </div>
);
