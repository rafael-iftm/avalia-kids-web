import React from 'react';

interface PageTitleProps {
    title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
    <h1 className="text-[32px] font-semibold "
    >
        {title}
    </h1>
);

export default PageTitle;

