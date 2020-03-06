import mjml2html from 'mjml'

type ProNoAccountMatchCompileData = {
  paymentEmail: string
}

export const createProNAM = (data: ProNoAccountMatchCompileData) =>
  mjml2html(`
    <mjml>
    <mj-head>
      <mj-attributes>
        <mj-all font-family="HelveticaNeue" />
        <mj-all font-size="18px" line-height="1.55" color="#2f2f2f" />
      </mj-attributes>
      <mj-style inline="inline">
        h1 {
          color: #0065ff !important;
          font-size: 32px;
          margin-bottom: 35px;
        }
        span {
        	font-size: 14px;
        }
      </mj-style>
    </mj-head>
    <mj-body>
      <mj-wrapper padding="3% 8%">
        <mj-section>
          <mj-column>
            <mj-text padding="0">
              <h1>This is awkward :-/</h1>
              Hey there,<br /><br />
              We couldn't find an Account associated to your payment email, <b>${data.paymentEmail}</b>. This most likely happened because you changed the pre-filled email address while you were checking out.
              <br /><br />
              <b>Please reply</b> to this email with:
              <ul>
                <li>Your Username</li>
                <li>The email you used to sign up for typvp</li>
              </ul>
              <span>(All of this info can be found on your Profile page)</span>
              <br /> <br />
              and I will manually update your Account Email & Pro status! I'm <i>very</i> sorry for the inconvenience, the robots were supposed to do their job :(
              <br /><br />
              <span><b>P.S.</b> If you have any questions or concerns, please feel free to reach out. You can contact me by <u>replying to this email</u> or send me a reddit message — <u>u/what_is_productivity</u></span>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-wrapper>
    </mj-body>
  </mjml>
`)
