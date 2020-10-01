import * as React from "react";
import { render } from "react-dom";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import * as firebase from "firebase/app";
import "firebase/database";
import { config } from "./config";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const s = (a: any) => JSON.stringify(a, null, 2);

const path = "TEST_NAMESPACE/user_bookmarks";
class MutationExample extends React.Component {
  state = {
    pushedKey: ""
  };
  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <FirebaseDatabaseMutation type="push" path={path}>
          {({ runMutation }) => {
            return (
              <div>
                <button
                  data-testid="test-push"
                  onClick={async () => {
                    // FIREBASE DATA write here in {adsdas}
                    const { key } = await runMutation({ HHHH: "djifsjdf" });
                    this.setState({ pushedKey: key });
                  }}
                >
                  Push
                </button>
              </div>
            );
          }}
        </FirebaseDatabaseMutation>
        {state.pushedKey !== "" && (
          <div>
            <div data-testid="test-push-result">{state.pushedKey}</div>
            <div>
              <FirebaseDatabaseNode path={`${path}/${state.pushedKey}`}>
                {({ value }) => <pre>{s(value)}</pre>}
              </FirebaseDatabaseNode>
              <FirebaseDatabaseMutation
                type="set"
                path={`${path}/${state.pushedKey}`}
              >
                {({ runMutation }) => (
                  <button
                    onClick={async () => {
                      runMutation(null);
                      this.setState({ pushedKey: "" });
                    }}
                  >
                    Delete
                  </button>
                )}
              </FirebaseDatabaseMutation>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const App = () => (
  <div style={styles}>
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <div>
        Data in <pre>user_bookmarks</pre>
      </div>
      <MutationExample />
    </FirebaseDatabaseProvider>
  </div>
);

render(<App />, document.getElementById("root"));
