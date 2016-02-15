package fr.yca.brico.utils;

public class BricoException extends Exception {

	private static final long serialVersionUID = 1L;

	public String message;

	public BricoException() {
		super();
	}

	public BricoException(String message) {
		super();
		setMessage(message);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}