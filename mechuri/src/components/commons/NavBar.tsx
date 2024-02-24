'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

const components: { title: string; href: string; description: string }[] = [
  {
    title: '룰렛 돌리기',
    href: '/roulette',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: '메뉴 추천 테스트',
    href: '/foodchoice',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: '메추리 봇',
    href: '/mechuribot',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: '메추리 지도',
    href: '/map',
    description: 'Visually or semantically separates content.',
  },
];

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {components.map((component) => (
          <Link key={component.href} href={component.href} passHref>
            <NavigationMenuItem key={component.href}>
              <NavigationMenuTrigger>{component.title}</NavigationMenuTrigger>
              <NavigationMenuContent>{component.description}</NavigationMenuContent>
            </NavigationMenuItem>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

    /* 나중에 커스텀할 용도로 냅둔 것 */
    //     <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <NavigationMenuLink>Link</NavigationMenuLink>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
}

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })
// ListItem.displayName = "ListItem"
