import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-10 flex flex-1 items-center w-screen h-14', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  // 여기가 NavagationMenuList에 배치되는 것 관련 코드.
  <div className="flex items-center justify-between w-full mx-10">
    {/* 왼쪽 이미지 배치 */}
    <div className="">
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJAAwAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAgMEBQcAAQj/xAA4EAABAwMCAwYDBwQCAwAAAAABAAIDBAUREiEGMUEHEyJRYXEygaEUI0KRsdHwM1JiwRVykuHx/8QAGAEAAwEBAAAAAAAAAAAAAAAAAQIDAAT/xAAgEQACAgMBAQEAAwAAAAAAAAAAAQIREiExA0ETBFFh/9oADAMBAAIRAxEAPwDEHLxKwvMLGOyibgCi+13xr3Ny2IZQzhaP2VUYLZagjm/APoEsnSCummQNwxo9FLjamIwpcY2CkijFgIO4kZitBRoAhu/U4kqWnCE02hvNpMHGhLwrBtGPJOtpGdVHBl8kVek+S9DT5K4FJGltpImgknAHMo4MGaKKpqI6KF09Q7EY/MlDtRdKise4F3cQ9Gg7lQuIbx/ydwc6LIpYzpiB6jz9ykUsjd34z03O3zKpHzrbFc70idG0EbPOfbH6p+OkODnW7zOvA/0kROc1gJGOoDW/z/S7vqhz/DEyIecuXu/8f/aqkI2SWUkOka3NGOmrV+6fYyPR4dDm+rdJ+oUGSSUbBznu64GPoF0bpn/iaB1Jdn6D91qBZYO1aNGQPR3L5A7foobq1lJM1pxoJwQDkD1Cjy/aB4PtEe/QNP6p+mtT2COsqXd5ET/TdtgpZRtDRkWrIu9YHxuDmu3BbuCnG0pcDkJulMdG4MYSKeQ504+A+itWbtByCPRR/NIpk2AnGFuxBrwdt0DLYeI6QT0TseSyOpjMc8jD0cV0w5Rzei3YldhcuynJiTstj7NKYRWKJ+N3brHCt44KhEViph/gAlnwMehHGFKYEzGN1KjGymh2LaFS3aPMwKvGqrujcyA4WYUVYj2TjYk+1mydawIUPZHEapuM6k0PDtS9jg18gEYOfPn9ER6fRAfanPtb6QHZuqdw/ID9SjQLAGLctfIQGeRAU+nmBHhjAHR2N/kq5p88epKeNQGDxeJ3QA/zCehUy5imeDqxoz1du4/VSW1bA3xPb6AAFD8EktS8huAzkcfuiKzcOzXCUNY123xOI2aiboxLWhrtLNJz00NOP56pLHVU7gIQMH+xn+1pNl4Ag0h0+/oeX5IkpOEKCmA0M380tjKFdMwtlnrJSHVDSWt2xvlTr7RTxCFoBETBjAWqx2iFjNLWABU95sfetcWDpgAIBxRl/eRvYYy4Hpgp+xVrnONLP8bDtnqFE4go3UFU4Fji0dPRVFPXiGsjk1lzQMO38Q+Xos1YbrQeVcIkpnAjmsc4kp+4ukjcYBK2a2TMrKJsjNwRhZh2gU/d3AOxjJRgTmCy5cuVCR5jJA9V9C8MsDbTAAPwj9F89dR7r6I4XGbRTn/EJZBRcxhSWDZNRtT7QkCLaFAuLfEFYtCh17VhkQQNksNXrWp1rVhhDQss7TZQ/iAtbnTBTxscf8iXOx+TgtXe5kLDI9pc1v4W8yfJZV2r02Lw2oghfC+qhbJLEfwkDTt7gBKpLLEbB45AO+c5IbzA5Dcr2CJ8rgJM6Sc4HVeUkBc/Jbt1J2CMeG7BJV1UZcwhuctY4Y/NUlKhIxyJvB/Db62RuW6QMEuLchjfbz8lrtrs9PRwsZFGAAqy2missQg1DXzcBvk+f85YVtDxHQDZ8mkKd2WquFxA3Rt0T4woVJcaWqbmKZjs+RTxkwEwrHxhJe1rhghMiVK1E7glYwJcXWGOsge9o3HkN1iN+p3W64Rl4xh+V9KVEethB5dVh/azbzT1Ae1o0uORslToz2FtvLHUrHxABr2h2w9Fn3aZBgh+Eb8KOMlmptRziMDdDXaZDmi14Tx6Tlwy5cuXioSPM4K+iODiHWamI/sC+dz1X0HwE7XY6f8A6BLIZBPG1PgJuMJ1oShFNGyjVw8KlBMVbSWIBRCjCdaEhjcBOALBYtkIlIDh4Q4F3yWe9qMZr6+kMcWSGOBJ+i0ikIDnFwJGDsFWXS2MkiaZItUxyAfMeijLUrOjzpwpmWcEcMzV1YZJBhjDt/8AVsFptFPb4cMjBJ55VTwdRtgjdpA3JRe2Jr48eia8gVRFP2YOwY2Z/wCqbnoqKoaA+CH5BUXEdlvbsutFzEefwPiDgg++ycVWiGM0sklTI8Eyl8TSGuz6Dksk2M6SsMprO2GbVAdODsFeW4yMgAlOSgnhe8XKQx093a3vZItTXMBA9Rv1wjigic9m+yytMLWiS+UBpJPRUFbxFVRSmOkpTIB13/0p9wkczwj5oem4mstvn7urrY2vGxGoDC1uwUvpaQXm5PbrltzmjqAChDjylN+q7VHA0/el5e122kNxnKNLdfaCtOKaQEeYcCPzCqOJpA2/UWw8VPJuOhLh+yC6K9Ii0NK2kp2RMxhoxshftFZrtr/ZF4KFO0AZtUnsqrpGXDHVy5cqkRJW89mcnecPQf8AVYOQts7JZe8sLGdW7IMJoLBunWjdNs5p0JQigE3VD7tOjkk1AyxAxXt5eycCSGpYGN0BhUL3tcXAFrQcasZz54S62iZVYe6R0ga0ljcgADz8OM/NNx+Ebob4fu73cFUlRMYyyF8sLNMmRhjyAHDGQ7GPTG/VLJXspCVaL2ztDJ6hrNgHK+ik0hD/AA68VELqlhBZOBI32dv/ALV2weqmmX6TMB7cOGVEntzJBjW9oPMAqRE4DmnS9oGVRbEqiDFbWAguc548nFWlNE1rcAAKKyUuPhGyl05JCZCSuiqu1EJ2ysGRqBGWnBHz6IBufAFurasTubO0gjUBgtdgAdAtLqH6Zjk/FySAxjjlBjLmwPpeCqJ9w+3SOlEpIJ0EsBxyBASeKQ1t6pv8afA/NGbsNadO3qgfiWTVfIuRwNIP0P6hIuhk7Qhhyhbj8j/i5PZFLWYAAQf2hu0W2QHyVF0jLhkSUkL3KqRFdD7LXOxeoa6llh6teVkSPeyCt+z3mWnJ8LwHD3QZjc2J4BNMTzeSARQCTMMsOU41eS/AVjIrwNylDkkjmU4AkHQ24FQW22jhs77ZDAxtLJr1xhvxF5JJJ+fv5KyISSFg/RuxxMp4vs8YxHGA1vsFaHbkq2P7mo1cwThWIdqaCoHSuHd6G816JO8w3O3VMTgaSeWFSRcRU1FUvhubJac82ve0ljh5hyKkNi5cLieqqKBrxHB3xPw+LA9jsut16MsZfMwxPGxYTnB9wmmX6zVDMNron5Gxyktp6Gof3n2iNzXcvEN0z/xmwf1EuO4C4OeY2uw12NWNlKZLgYUfDKWLYYA3wEyJ9Ryzkd0GxUSaqoEcL3u5AZ90D12qe5wEnOS95RRcHjuCwuOokEKhjgzO+V3QaWrJfScnfBxoyDlAPabLpoizzWgO8DSsv7UKjJDAqQ6Slwzpe5Xi5WJHuVccJVpt/ENHNnDS/S72KpglMcWOD2824IPkVjH1VRSiWnZINwQpjELcA3NtysVPJqydIz7ooYlMOtSnjLSkDISs7LMJD7vxFONhzyKkhjSPVIwQ7GFJsqI7jzXdypABxySHu08uaNmIssOpjwOY3CainIGHHfkpn4c4yoNXEWO7xgz5qMu2dEOEhoLzkJu4UMdVBggB7d2kjkUikqg7ZWILSByKKVoNuLtABXW2GN7vtNvBdn+pDsT+Sgtt9PKdMTKrX5A/uFpc1HSzDxtymorbTREOYPokcHZ3R/n1Gmgbt/D/AHULXVc9RIAcshfKS1vy6lX1OWjZjcbJdZK2NuDgeWVCfWU8bcCUZ6nzTI4pzbbY/UMD3ElQ3xDBTb7tTM/GD80w+8U2D4vqnyiQqQzXMc1hI5YWNdoFRruDYv7d1rNyusBgeWu6LD+J6n7TeJ3A7NOE/nT2J6WlRVuBacHY9V4rvia2Poq18mn7t5yPdUiqnatEmmnTOXLlyIDUexm893PNbZHdQ6MHy6raGYPLkvlfh+5OtN2pqxhwGO8Xt1X0xZK1lwoIZ4nAhzBulaMWfNKGw6JISuY3QGKas4gpaOd0UjwHDooUnFlKPhOUP8VMxcySOaqmtPQfRcspOzrjBUGB4wiA+Fx9gutvET7tdI6SnYRqJLjjk0c0JGNzsNDTk8gB1R7wZYn22ndU1LcVM7R4TzY3oPcoJyehnGKLuYYGAmpGB7cEJ+TcpvG6pQhT1FOWvL2HDgm23R0AxMNPqeRVtNHqGwVTVxagQeSnJNbRSLX0eF2zywR5hOR3B8h0sySq6nomas6QSrqhhbGMBoGVo2GVA9xzFUR2mKoic4Fkv3hb5HkgQzzu3dK/HXdbSYY5mmKWNr4yMFrhkEKFNYYYHNdSRQNj1feMdCCCPQo4WxV6V8MjD3av6jj81JiBPqtCunB1LV5kocQyc9BHhKFa+0VNtkeydm4G2ncH5pZeUkP+qBLiStFJSu088LNpHukkdI4+JxyUQcXVbpax0JDgG8weiHy04zggeeF1eUcYnF6yykapfLYy4Uz29cYGyzO4UctFUOikBxnY+a2cs8ZzyQ/xJYoq6DUxnjHLZThLF0POKkjLlyfrKSSjmMcrcEJhdJznLWux/iXSw2upduz+nk8wslUm31s1BVxVVM7TLG7I9VjH1k1wIyN0oIY4I4khvtrjkY4F+wcOoPqiV72sblxwEoUC17t76q4gRtLidhhW7LHAKKKn7uPU0bucPiPVWNOGlzpA0tcdskbkJbw93n7jcrLzX0pmxNtsNFRnvmxxul5AgcvZTpmkclDie6PdjvfV1Tv2l5+Nowl/MdT/ALPHNPNNHYpx0xx8I/NMSSnHwjKGDDkL2IUWWn1+STJVvYWiNrSM75TMlbMXgNLBz2wt+YVIkRwBm+FIDmsAyQPPdVne1DnDxOAIO2Nl5GSyVznEZI36oryA5lzHVR51DceYUkPLhuefLCHZLhDTgkyM23LQc4CjxTVtVC8xzOiiH9u7nc/5smwSFc7COsroKbOp2ZNOdO/8CpKqpina6eUgveQA3HLlt9VGhlkgqJYXufLG/ZpeNX8/dLhopagFwdhmcgYGGnqEy0K9kaax227zaayip5Q3mHNGfzCbuXAfDkdFIH0WGlo2a4jYfwomt9CyAuk1ajsN+ewUyaJk8WHgfuVgYo//2Q=="
        alt="Logo"
        className="h-10"
      />
    </div>

    {/* 기능 목록 */}
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        'flex flex-1 list-none items-center space-x-10', // justify-end로 오른쪽 정렬
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

// const NavigationMenuItem = NavigationMenuPrimitive.Item; // 기존 코드
const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ children, ...props }, ref) => (
  <NavigationMenuPrimitive.Item
    ref={ref}
    className="relative" // 여기에 position: relative 스타일을 적용
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Item>
));

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'absoulute left-0 top-full w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ',
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('absolute left-0 top-full flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
