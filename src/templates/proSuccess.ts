import mjml2html from 'mjml'

type ProSuccessCompileData = {
  username: string
}

export const createProSuccess = (data: ProSuccessCompileData) =>
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
              <h1>Shoes off at the door, please ;-)</h1>
              ${data.username},<br /><br />
              I wanted to drop you a line and personally say thanks for your typvp Pro membership. You're a champion, truly.
              <br /><br />
              <span><b>P.S.</b> If you have any questions or concerns, please feel free to reach out. You can contact me by <u>replying to this email</u> or send me a reddit message — <u>u/what_is_productivity</u></span>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-wrapper>
    </mj-body>
  </mjml>
`)
