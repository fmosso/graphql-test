package lambdas;

import java.math.BigDecimal;
import java.util.List;

public class Team {
	boolean active;
    String description;
    List<BigDecimal> dateOfCreation;
    String creator;
    String tag;
    String icon;
    String name;
    public Team() {}

    public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<BigDecimal> getDate() {
		return dateOfCreation;
	}
	public void setDateOfCreation(List<BigDecimal> date) {
		this.dateOfCreation = date;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}

