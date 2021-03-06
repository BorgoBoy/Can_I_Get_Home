import React from "react"

import { signOut } from "firebase/auth";
import { Fragment } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, LoginIcon, UserIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: (window.location.pathname == '/dashboard') ? true : false },
  { name: 'New Bike', href: '/newbike', current: (window.location.pathname == '/newbike') ? true : false },
  { name: 'New Record', href: '/newrecord', current: (window.location.pathname == '/newrecord') ? true : false },
  { name: 'Calculator', href: '/calculator', current: (window.location.pathname == '/calculator') ? true : false  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Navbar (props) {
    const [user] = useAuthState(props.auth)

    return(
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                        </Disclosure.Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/"><img
                            className="block h-8 w-auto pr-2"
                            src="/favicon.png?"
                            alt="Can I Get Home?"
                            />
                            </a>
                            <a href="/"><h3 className="text-white font-semibold text-xl">Can I Get Home?</h3></a>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </a>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            { !user ? <LoginIcon className="h-6 w-6 text-gray-400"/> : <UserIcon className="h-6 w-6 text-gray-400"/>}
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                { !user ?
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="/login"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Log In
                                        </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="/signup"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Register
                                        </a>
                                        )}
                                    </Menu.Item>
                                </> :
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="/settings"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Settings
                                        </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            onClick={() => signOut(props.auth)}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Sign out
                                        </a>
                                        )}
                                    </Menu.Item>
                                </>}
                            </Menu.Items>
                        </Transition>
                        </Menu>
                    </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                        </a>
                    ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar

//TODO: Logout redirect