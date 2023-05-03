import MessageBox from "../components/MessageBox"

function NotFound() {
  return (
      <div>
          <MessageBox variant="danger">
              {/* add icon of exclamation later */}
              Page Not Found.
          </MessageBox>
      </div>
  )
}

export default NotFound