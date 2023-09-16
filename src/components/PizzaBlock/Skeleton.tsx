import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = (props: any) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <circle cx='140' cy='125' r='125' />
    <rect x='0' y='260' rx='10' ry='10' width='280' height='25' />
    <rect x='0' y='310' rx='10' ry='10' width='280' height='88' />
    <rect x='0' y='410' rx='10' ry='10' width='110' height='55' />
    <rect x='130' y='410' rx='35' ry='35' width='150' height='55' />
  </ContentLoader>
);
