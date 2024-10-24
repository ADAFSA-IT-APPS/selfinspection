const config = {
    screens: {
        Tabs: {
            screens: {
                live: 'live',
            },
            //path: "Dashboard",
            /*   parse: {
                  id: (id) => `${id}`,
              }, */
        },
     /*    Tabs: {
            screens: {
                Dashboard: "Dashboard",
            }

        }, */
        CallScreen: "CallScreen",
        Notifications: "Notifications",
        Join: "Join",
    },
};

const linking = {
    prefixes: ["SI://app"],
    config,
};

export default linking;