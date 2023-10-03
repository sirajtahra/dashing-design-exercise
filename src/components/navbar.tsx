import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils/classNames";
import { useAuth } from "../hooks/useAuth";

import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  const { user, signout } = useAuth();

  return (
    <Disclosure as="nav" className={styles.navbar}>
      {({ open }) => (
        <>
          <div className={styles.container}>
            <div className={styles.subContainer}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className={styles.logo}
                    src="https://dashingdev.com/wp-content/uploads/2023/03/cropped-DASHING_Web-logo-300x67.png"
                    alt="Dashing Designs"
                  />
                </div>
                <div className={classNames("hidden", styles.mainSection)}>
                  <div className="flex space-x-4">
                    <a href="#" className={styles.link}>
                      Home
                    </a>
                  </div>
                </div>
              </div>
              <div className={classNames("hidden", styles.mainSection)}>
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className={styles.userIconButton}>
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className={styles.userIconImg}
                          src={user.image}
                          alt=""
                        />
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
                      <Menu.Items className={styles.menuPopOver}>
                        <Menu.Item>
                          <button className={styles.linkBtn} onClick={signout}>
                            Sign out
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className={styles.menuContainer}>
                {/* Mobile menu button */}
                <Disclosure.Button className={styles.menuIconButton}>
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block"
                      aria-hidden="true"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Bars3Icon
                      className="block"
                      aria-hidden="true"
                      width={20}
                      height={20}
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className={styles.disclosureMenuContainer}>
            <div className={styles.section}>
              <Disclosure.Button as="a" href="#" className={styles.link}>
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className={styles.linkBtn}
                onClick={signout}
              >
                Sign out
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
