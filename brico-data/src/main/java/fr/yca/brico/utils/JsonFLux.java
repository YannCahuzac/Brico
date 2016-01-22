package fr.yca.brico.utils;

public class JsonFLux {

	public int id1;
	public String lib1;
	public String lib2;
	public String libcss1;

	public JsonFLux() {
		super();
	}

	public JsonFLux(String lib1, String lib2) {
		super();
		this.lib1 = lib1;
		this.lib2 = lib2;
	}

	public JsonFLux(int id1, String lib1, String libcss1) {
		super();
		this.id1 = id1;
		this.lib1 = lib1;
		this.libcss1 = libcss1;
	}

	public String getLib1() {
		return lib1;
	}

	public void setLib1(String lib1) {
		this.lib1 = lib1;
	}

	public String getLib2() {
		return lib2;
	}

	public void setLib2(String lib2) {
		this.lib2 = lib2;
	}

	public int getId1() {
		return id1;
	}

	public void setId1(int id1) {
		this.id1 = id1;
	}

	public String getLibcss1() {
		return libcss1;
	}

	public void setLibcss1(String libcss1) {
		this.libcss1 = libcss1;
	}

}