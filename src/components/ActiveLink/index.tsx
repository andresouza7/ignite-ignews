import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeLinkClassName: string;
}

export function ActiveLink({ children, activeLinkClassName, ...props }: ActiveLinkProps) {
  const { asPath } = useRouter()

  const className = asPath === props.href
    ? activeLinkClassName
    : ""

  return (
    <Link {...props}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}