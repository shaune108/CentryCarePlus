<div class="Row-Contact">
			Let us know what's on your mind. We will help.<br />
    Click to Call: <a href="tel:443-599-8280">443-599-8280</a>
    <h2>Request a no-obligation, in-home consultation.</h2>
			<br />

			<form
				class="form"
				method="POST"
				action="../../sendmail.php"
				enctype="multipart/form-data"
			>
				<div class="form-row">
					<div class="input-field required">
						<label class="field-label" for="name">
							<i class="fa-duotone fa-id-card"><!--Icon--></i>
							Name:
						</label>

						<input
							class="field-input"
							type="text"
							name="name"
							required
						/>
					</div>

					<div class="input-field">
						<label class="field-label" for="email">
							<i class="fa-duotone fa-at"><!--Icon--></i>
							Email:
						</label>

						<input
							class="field-input"
							name="email"
							type="email"
							pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
							title="Valid email addresses must have text@text.TLD"
						/>
					</div>

					<div class="input-field">
						<label class="field-label" for="phone">
							<i class="fa-duotone fa-mobile"><!--Icon--></i>
							Phone:
						</label>

						<input
							class="field-input"
							name="phone"
							type="text"
							data-imask="000-000-0000"
						/>
					</div>
				</div>

				<div class="input-field required">
					<label class="field-label" for="message">
						<i class="fa-duotone fa-message-lines"><!--Icon--></i>
						Message:
					</label>

					<textarea
						class="field-input"
						name="message"
					></textarea>
				</div>

				<div class="captcha-field">
					<div class="captcha">
						<img class="captcha-image" src="../../captcha.php" alt="CAPTCHA" />

						<button
							type="button"
							class="button captcha-refresh-btn"
							title="Reset Captcha Image"
						>
							<i class="fa-solid fa-arrows-rotate"><!--Icon--></i>
						</button>
					</div>

					<div class="input-field required">
						<label for="captcha-response" class="field-label">
							<strong>SPAM CHECK:</strong>
							Enter the characters you see in the image
						</label>

						<input
							type="text"
							name="captcha-response"
							class="field-input"
							required
							placeholder=""
						/>
					</div>
				</div>

				<button type="submit" class="button">
					Send
					<i class="fa-solid fa-paper-plane"><!--Icon--></i>
				</button>
			</form>
		</div>
    <div class="BackToTop">
			<img id="CloseBTT" src="../../Images-Main/close.png" alt="close" />
			<a href="tel:443-599-8280">Call Now<br />443-599-8280</a>
			<a href="../../Contact.html">
				Send a Message<br /><i class="fas fa-envelope"><!--Icon--></i>
			</a>
			<a id="BackToTop"><i class="fas fa-arrow-circle-up"><!--Icon--></i></a>
		</div>
    
	<script src="../../plugins/jquery.1.11.1.min.js"></script>
		<script src="../../plugins/jquery.mobile.custom.min.js"></script>
		<script src="../../plugins/back-to-top.js"></script>
		<script type="module" src="../../plugins/main.js"></script>
