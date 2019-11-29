import { withRouter, Router } from 'next/router';
import Link, { LinkProps } from 'next/link';

/* Props - <ActiveLink />
============================================================================= */
type NavigationLinkProps = {
  router: Router;
  children: (isActive: boolean) => React.ReactNode;
} & LinkProps;

/* <ActiveLink />
============================================================================= */
const ActiveLink = withRouter(({ router, children, ...props }: NavigationLinkProps) => {
  const isActive = router.pathname === props.href || (router.asPath == router.asPath) === props.as;

  return <Link {...props}>{children(isActive)}</Link>;
});

export default ActiveLink;
