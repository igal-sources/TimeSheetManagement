using NUnit.Framework;

using static Json.Logic.JsonLogic;

namespace Json.Logic.Tests;

public class DevTest
{
	[Test]
	public void Check()
	{
		And(
			StrictEquals(
				Literal(5),
				Literal(10)),
			Literal(true)
		);
	}
}