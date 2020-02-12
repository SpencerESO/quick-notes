import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import styled from "@emotion/styled";

import awsExports from "./aws-exports";
import Screens from "./components/Screens";

const Title = styled("h1")
`
  text-align: center;
  text-transform: uppercase;
  color: #a7d7c5;
  margin-bottom: 8px;
`;

const theme = {
    formContainer: {
        margin: 0,
        padding: "8px 24px 24px"
    },
    formSection: {
        backgroundColor: "#fafaff",
        borderRadius: "4px"
    },
    sectionHeader: {
        color: "#0B0863"
    },
    sectionFooterSecondaryContent: {
        color: "#303952"
    },
    inputLabel: {
        color: "#0B0863"
    },
    input: {
        backgroundColor: "#f4f9f4",
        color: "#0B0863"
    },
    hint: {
        color: "#0B0863"
    },
    button: {
        borderRadius: "3px",
        backgroundColor: "#a7d7c5"
    },
    a: {
        color: "#a7d7c5"
    }
};

function App() {
    const [state, setState] = useState({ isLoggedIn: false, user: null });

    const checkLoggedIn = () => {
        Auth.currentAuthenticatedUser()
            .then(data => {
                const user = { username: data.username, ...data.attributes };
                setState({ isLoggedIn: true, user });
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return state.isLoggedIn ? ( <
        Screens / >
    ) : ( <
        >
        <
        Title > Quick Notes < /Title>{" "} <
        Authenticator onStateChange = {
            authState => {
                if (authState === "signedIn") {
                    checkLoggedIn();
                }
            }
        }
        amplifyConfig = { awsExports }
        theme = { theme }
        />{" "} <
        />
    );
}

export default App;