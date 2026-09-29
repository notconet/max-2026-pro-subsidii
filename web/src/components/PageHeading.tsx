import { Typography } from "@maxhub/max-ui";
import type { ReactNode } from "react";

import styles from './PageHeading.module.css';

type Props = {
    text: string;
    children?: ReactNode;
}

export default function PageHeading({text, children}: Props) {
  return (
    <div className={styles.heading}>
        <Typography.Headline>{text}</Typography.Headline>
        <div className={styles.side}>
            {children}
        </div>
    </div>
  )
}